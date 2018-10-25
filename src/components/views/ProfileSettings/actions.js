import realm from "../../../models";
import { Alert, Linking, Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import RNCalendarEvents from "react-native-calendar-events";
import axios from "axios";
import moment from "moment";
import { UPDATE_USER_SETTINGS, SYNC_CALENDAR, SYNC_HEALTHKIT_VALUES } from "./../../../variables";
import { loadWorkoutFromServer } from "./../Tabs/Training/actions";
import AppleHealthKit from 'rn-apple-healthkit';
import Mixpanel from "react-native-mixpanel";
import firebase from "react-native-firebase";

export const logOut = () => {
	return dispatch => {
		Alert.alert(
			"Log Out?",
			"Are you sure you want to log out of the app? all unsynced data will be lost!",
			[
				{
					text: "Log out",
					onPress: () => logOutAction(dispatch),
					style: "destructive"
				},
				{ text: "Cancel", onPress: () => console.log("OK Pressed") }
			],
			{ cancelable: true }
		);
	};
};

export const pushWorkoutDates = () => {
	return (dispatch, getState) => {
		if (!getState().user.user.pushWorkouts == true) {
			Alert.alert(
				"",
				"Enabling this option will allow skipped workouts to be shifted forward with the calendar, and future workouts shifted backward when logging an upcoming workout before its scheduled date",
				[
					{ text: "Enable", onPress: () => dispatch(_pushWorkouts()) },
					{ text: "Cancel", onPress: () => console.log("OK Pressed") }
				],
				{ cancelable: true }
			);
		} else {
			Alert.alert(
				"",
				"Disabling this option will not shift workouts forward with the calendar, and future workouts will not be shifted back when logging an upcoming workout before its scheduled date.",
				[
					{ text: "Disable", onPress: () => dispatch(_pushWorkouts()) },
					{ text: "Cancel", onPress: () => console.log("OK Pressed") }
				],
				{ cancelable: true }
			);
		}
	};
};

export const healthKitUpdate = () => {
	return (dispatch, getState) => {
		if (!getState().user.user.healthKit == true) {
			Alert.alert(
				"",
				"Enabling this option will allow HealthKit data to be automatically synced with your personal trainer, allowing a more personalized training experience. Make sure Health app categories for APLYFT are turned On.",
				[
					{ text: "Enable", onPress: () => dispatch(_pushHealthKit()) },
					{ text: "Cancel", onPress: () => console.log("OK Pressed") }
				],
				{ cancelable: true }
			);
		} else {
			Alert.alert(
				"",
				"Disabling this option will not allow HealthKit data to be automatically synced with your personal trainer. Make sure Health app categories for APLYFT are turned On.",
				[
					{ text: "Disable", onPress: () => dispatch(_pushHealthKit()) },
					{ text: "Cancel", onPress: () => console.log("OK Pressed") }
				],
				{ cancelable: true }
			);
		}
	};
};

export const weightUpdate = () => {
	return (dispatch, getState) => {
		if (!getState().user.user.updateWeight == true) {
			Alert.alert(
				"",
				"Enabling this option will require you to key in a Daily Weight Update.",
				[
					{ text: "Enable", onPress: () => dispatch(_updateWeight()) },
					{ text: "Cancel", onPress: () => console.log("OK Pressed") }
				],
				{ cancelable: true }
			);
		} else {
			Alert.alert(
				"",
				"Disabling this option will no longer require you to key in a Daily Weight Update.",
				[
					{ text: "Disable", onPress: () => dispatch(_updateWeight()) },
					{ text: "Cancel", onPress: () => console.log("OK Pressed") }
				],
				{ cancelable: true }
			);
		}
	};
};

export const calendarSync = () => {
	return (dispatch, getState) => {
		// RNCalendarEvents.authorizationStatus().then(promise => {
		//   console.log("promise for authorizationStatus:  ", promise);
		// });
		RNCalendarEvents.authorizationStatus()
			.then(status => {
				console.log(status, "STATUS CALENDAR");

				if (status == "undetermined") {
					// if we made it this far, we need to ask the user for access

					RNCalendarEvents.authorizeEventStore().then(out => {
						console.log(out, "OUT CALENDAR");
						if (out == "authorized") {
							//console.log(status, "status CALENDAR");
							// set the new status to the auth state
							dispatch({
								type: "cal_auth",
								payload: out
							});
							dispatch({
								type: "goto_chooseCalendar"
							});
						}
					});
				} else if (status == "denied") {
					// if we made it this far, we need to ask the user for access
					Alert.alert(
						"Calendar Access?",
						"Allow aplyft to access your calendar in your settings under privacy",
						[
							{
								text: "Ok",
								onPress: () => Linking.openURL("app-settings:")
							}
						],
						{ cancelable: true }
					);
				} else {
					//console.log("I am where the status i authorized");
					dispatch({
						type: "goto_chooseCalendar"
					});
				}
			})
			.catch(error => console.warn("Auth Error: ", error));
	};
};

export const loadCalendars = () => {
	//console.log("I am here : !@#$%^&*&^%$#@!");
	return (dispatch, getState) => {
		RNCalendarEvents.findCalendars().then(calendars => {
			//console.log(calendars, "calendars Are YOOO ");
			var calendars_array = [];

			for (var i in calendars) {
				var row = calendars[i];
				var calendars_to_insert = {};
				calendars_to_insert.id = row.id;
				calendars_to_insert.title = row.title;

				calendars_array.push(calendars_to_insert);
			}
			//console.log("calendars_array is : $$$$$$$$$", calendars_array);
			dispatch({
				type: "calendar_fetched_list",
				payload: calendars_array
			});
		});
	};
};

export const fetchAllEvents = payload => {
	return (dispatch, getState) => {
		dispatch({ type: "fetching_events_started" });
		var calendar_ids = payload.ids_array;
		var today_date = moment().format("YYYY-MM-DDTHH:mm:ss.sssZ");
		var nextMonth_date = moment()
			.add(2, "months")
			.format("YYYY-MM-DDTHH:mm:ss.sssZ");
		dispatch({ type: "fetching_events_finshed" });

		RNCalendarEvents.fetchAllEvents(
			today_date,
			nextMonth_date,
			calendar_ids //"1CFEAAAB-91F7-4BA5-877B-FB447CE06B97"
		).then(events => {
			dispatch(Sync_calendar_events(events));
		});
	};
};

export const Sync_calendar_events = events => {
	return (dispatch, getState) => {
		var events_array = [];

		for (var i in events) {
			var row = events[i];
			var events_to_insert = {};
			events_to_insert.title = row.title;
			events_to_insert.description = row.notes;
			events_to_insert.from = row.startDate;
			events_to_insert.to = row.endDate;

			events_array.push(events_to_insert);
		}
		var data = events_array;
		console.log("DATA CONTAINS: :::::::>>", data);
		axios
			.post(SYNC_CALENDAR(getState().user.user.id), data)
			.then(results => {
				Alert.alert(
					"Success",
					"Calendar Successfully Synced",
					[
						{
							text: "ok",
							onPress: () => dispatch({ type: "go_back_from_CalenderSync" })
						}
					],
					{ cancelable: true }
				);

				dispatch({ type: "fetching_events_finshed" });
			})
			.catch(error => {
				Alert.alert("Calendar Sync Failed", "Try again Later", [
					{
						text: "ok",
						onPress: () => dispatch({ type: "go_back_from_CalenderSync" })
					}
				]);
				dispatch({ type: "fetching_events_finshed" });

				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response, "Error.Response in fetching_events");
				console.log(error, "Error in fetching_events");
			});
	};
};

export const goBack = dispatch => {
	return dispatch => {
		dispatch({ type: "go_back_from_CalenderSync" });
	};
};

export const _updateWeight = () => {
	return (dispatch, getState) => {
		if (!getState().user.user.updateWeight == true) {
			var updateWeight = 1;
		} else {
			var updateWeight = 0;
		}
		var fomrData = new FormData();

		fomrData.append("user_id", getState().user.user.id);
		fomrData.append("daily_weight_update", updateWeight);

		axios
			.post(UPDATE_USER_SETTINGS, fomrData)
			.then(results => {
				try {
					realm.write(() => {
						getState().user.user.updateWeight = !getState().user.user
							.updateWeight;
					});

					dispatch({
						type: "change_update_weight_value",
						payload: getState().user.user.updateWeight
					});
				} catch (e) {
					console.log(
						'Error while updating the value for "weightUpdate" in Realm and the error is :',
						e
					);
				}
			})
			.catch(error => {
				Alert.alert("Failed", "Try again Later", [
					{ text: "ok", onPress: () => console.log("OK Pressed") }
				]);
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response, "Error.Response in Updating Daily Weight ");
				console.log(error, "Error in Updating Daily Weight");
			});
	};
};

export const _pushWorkouts = () => {
	return (dispatch, getState) => {
		if (!getState().user.user.pushWorkouts == true) {
			var pushval = 1;
		} else {
			var pushval = 0;
		}
		var fomrData = new FormData();

		fomrData.append("user_id", getState().user.user.id);
		fomrData.append("push_workouts_dates", pushval);

		axios
			.post(UPDATE_USER_SETTINGS, fomrData)
			.then(results => {
				realm.write(() => {
					getState().user.user.pushWorkouts = !getState().user.user
						.pushWorkouts;
				});

				dispatch({
					type: "change_push_workouts_dates_value",
					payload: getState().user.user.pushWorkouts
				});
				dispatch(loadWorkoutFromServer());
			})
			.catch(error => {
				Alert.alert("Failed", "Try again Later", [
					{ text: "ok", onPress: () => console.log("OK Pressed") }
				]);
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response, "Error.Response in Pushing Workouts Dates");
				console.log(error, "Error in Pushing Workouts Dates");
			});
		// .then(() => {
		//   if (success) {
		//     // console.log("calling the workouts from server");
		//     dispatch(loadWorkoutFromServer());
		//     dispatch(loadSearchListItems());
		//     dispatch(switchToWorkout());
		//   }
		// });
	};
};

export const _pushHealthKit = () => {
	return async (dispatch, getState) => {
		if (!getState().user.user.healthKit == true) {
			var pushval = 1;
		} else {
			var pushval = 0;
		}
		var fomrData = new FormData();
		fomrData.append("user_id", getState().user.user.id);
		fomrData.append("health_kit_update", pushval);

		try {

			const response = await axios.post(UPDATE_USER_SETTINGS, fomrData);
			realm.write(() => {
				getState().user.user.healthKit = !getState().user.user.healthKit;
			});
			dispatch({
				type: "change_healthkit_value",
				payload: getState().user.user.healthKit
			});

		} catch (error) {
			Alert.alert("Failed", "Try again Later", [
				{ text: "ok", onPress: () => console.log("OK Pressed") }
			]);
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response, "Error.Response in Pushing Workouts Dates");
			console.log(error, "Error in Pushing Workouts Dates");
		}

	};
};

export const logOutAction = dispatch => {
	realm.write(() => {
		realm.deleteAll();
	});

	// unregister the user from the push notification iOS
	PushNotification.abandonPermissions();
	Mixpanel.reset();
	if(Platform.OS != "android")
		firebase.analytics().setUserId(null);
	
	dispatch({
		type: "user_logout"
	});
};

export const gotoPaymentsHistory = () => {
	return {
		type: "goto_payment_history"
	};
};

export const gotoSupport = () => {
	return {
		type: "goto_support_view"
	};
};

export const gotoUnits = () => {
	return {
		type: "goto_units_view"
	};
};

export const gotoProfileEdit = () => {
	return {
		type: "goto_profile_edit"
	};
};

export const gotoTutorial = () => {
	return {
		type: "goto-tutorial"
	};
};

export const viewCard = (payload) => {
	return {
		type: 'goto_card_details',
		payload: payload
	};
};

export const uploadHealthKit = (data) => {
	return async (dispatch, getState) => {

		try {
			const user_id = getState().user.user.id;
			const response = await axios.post(SYNC_HEALTHKIT_VALUES(user_id), data);

			// fo rnow it does nothing
			dispatch({ type: 'healthkit_success'});

		} catch (exception) {
			console.log("could not sync healthkit data");
			dispatch({ type: 'healthkit_failer'});
		}
	}
};

// export const healthiOSSync = () => {};
export const healthiOSSync = () => {

	if(Platform.OS == "android") {
		return {
			type: 'nothin'
		}
	}

	const PERMS = AppleHealthKit.Constants.Permissions;
	let options = {
    	permissions: {
        	read: [
        		PERMS.ActiveEnergyBurned,
				// PERMS.BiologicalSex,
				// PERMS.BloodGlucose,
				// PERMS.BloodPressureDiastolic,
				// PERMS.BloodPressureSystolic,
				// PERMS.BodyMassIndex,
				// PERMS.BodyTemperature,
				// PERMS.DateOfBirth,
				// PERMS.DistanceCycling,
				// PERMS.DistanceWalkingRunning,
				// PERMS.FlightsClimbed,
				PERMS.HeartRate,
				// PERMS.Height,
				// PERMS.LeanBodyMass,
				// PERMS.MindfulSession,
				// PERMS.RespiratoryRate,
				// PERMS.SleepAnalysis,
				PERMS.StepCount,
				PERMS.Steps,
				// PERMS.Weight
        	],
        	// write: ["Height", "Weight", "StepCount", "BodyMassIndex", "Biotin", "Caffeine", "Calcium", "Carbohydrates", "Chloride", "Cholesterol", "Copper", "EnergyConsumed", "FatMonounsaturated", "FatPolyunsaturated", "FatSaturated", "FatTotal", "Fiber", "Folate", "Iodine", "Iron", "Magnesium", "Manganese", "Molybdenum", "Niacin", "PantothenicAcid", "Phosphorus", "Potassium", "Protein", "Riboflavin", "Selenium", "Sodium", "Sugar", "Thiamin", "VitaminA", "VitaminB12", "VitaminB6", "VitaminC", "VitaminD", "VitaminE", "VitaminK", "Zinc", "Water"]
    	}
	};

	return (dispatch, getState) => {
		var healthkit = true;
		if (getState().user.user.healthKit != undefined){
			healthkit = getState().user.user.healthKit;
		}

		// double check if the user wants to sync his data
		AppleHealthKit.initHealthKit(options: Object, (err: string, results: Object) => {
			if (err) {
				console.log("error initializing Healthkit: ", err);
				return;
			}

			if (!healthkit) {
				let steps_options = {
				    startDate: moment().add(-8, 'days').toISOString(),
				    endDate: moment().add(-1, 'days').toISOString(),
				    ascending: false,
				};
				AppleHealthKit.getDailyStepCountSamples(steps_options, (err, results) => {
				    if (err) {
				    	console.log ("error getting the stepcount", err);
				        return;
				    }
				    // looping through the data to parse it
				    var data = [];
				    const list_value_id = "117"; // hardocded to the database, system
				   	for (var index in results){
				    	const row = results[index];
				    	data.push({
							"date_from": moment(row[0]).format("YYYY-MM-DD HH:mm:ss"),
							"date_to": moment(row[0]).add(1,'days').format("YYYY-MM-DD HH:mm:ss"), //same value
							"value": row[1],
							"custom_list_value_id": list_value_id
				    	});
				    }
				    dispatch(uploadHealthKit(data));
				    console.log ("step counts", results);
				});

				let active_energy_options = {
					unit: 'day',
				    startDate: moment().add(-8, 'days').toISOString(), // required
				    endDate: moment().add(-1, 'days').toISOString(), // optional; default now
				};
				AppleHealthKit.getActiveEnergyBurned(active_energy_options, (err, results) => {
				    if (err) {
				    	console.log ("getting the burned energy", err);
				        return;
				    }

				    // looping through the data to parse it
				    var data = [];
				    const list_value_id = "115"; // hardocded to the database, system
				    for (var index in results){
				    	const row = results[index];
				    	data.push({
							"date_from": moment(row[0]).format("YYYY-MM-DD HH:mm:ss"),
							"date_to": moment(row[0]).add(1,'days').format("YYYY-MM-DD HH:mm:ss"), //same value
							"value": row[1],
							"custom_list_value_id": list_value_id
				    	});
				    }
				    dispatch(uploadHealthKit(data));
				    console.log ("energy burned ", results);
				});

				let heart_rate_options = {
					// unit: 'day',
				    startDate: moment().add(-5, 'days').startOf('hour').toISOString(), // required
				    endDate: moment().add(-1, 'days').toISOString(), // optional; default now
				    ascending: false,
				};
				AppleHealthKit.getHeartRateHourlySamples(heart_rate_options, (err: Object, results: Array<Object>) => {
				  if (err) {
				  	console.log("error in healthkit", err);
				    return;
				  }
				  // looping through the data to parse it
				    var data = [];
				    const list_value_id = "116"; // hardocded to the database, system
				    for (var index in results){
				    	const row = results[index];
				    	data.push({
							"date_from": moment(row[0]).format("YYYY-MM-DD HH:mm:ss"),
							"date_to": moment(row[0]).add(1,'hours').format("YYYY-MM-DD HH:mm:ss"), //same value
							"value": row[1],
							"custom_list_value_id": list_value_id
				    	});
				    }
				    dispatch(uploadHealthKit(data));
				  	console.log("heart rate results:",results)
				});
			}

		});

	};
};
