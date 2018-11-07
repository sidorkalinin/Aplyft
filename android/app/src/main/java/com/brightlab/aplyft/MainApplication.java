package com.brightlab.aplyft;

import android.app.Application;
import com.facebook.CallbackManager;
import com.facebook.react.ReactApplication;
import cl.json.RNSharePackage;
import com.wog.videoplayer.VideoPlayerPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.gettipsi.stripe.StripeReactPackage;
import io.realm.react.RealmReactPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.horcrux.svg.SvgPackage;
import com.kevinresol.react_native_sound_recorder.RNSoundRecorderPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.taessina.paypal.RNPaypalWrapperPackage;
import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import org.reactnative.camera.RNCameraPackage;
import com.calendarevents.CalendarEventsPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnfs.RNFSPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import com.google.firebase.messaging.FirebaseMessaging;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.appevents.AppEventsLogger;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {


    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNSharePackage(),
            new VideoPlayerPackage(),
            new ReactNativePushNotificationPackage(),
            new RNCameraPackage(),
            new CalendarEventsPackage(),
            new RNSoundPackage(),
            new RNFSPackage(),
            new RNSoundRecorderPackage(),
            new RNMixpanel(),
            new RNFirebasePackage(),
            new RNFirebaseAnalyticsPackage(),
            new PickerPackage(),
            new StripeReactPackage(),
            new SvgPackage(),
            new RealmReactPackage(),
            new ReactVideoPackage(),
            new RNPaypalWrapperPackage(),
            new FBSDKPackage(mCallbackManager),
            new FastImageViewPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    AppEventsLogger.activateApp(this);
//    FirebaseMessaging.getInstance().subscribeToTopic("TopicXYZ");
  }
}
