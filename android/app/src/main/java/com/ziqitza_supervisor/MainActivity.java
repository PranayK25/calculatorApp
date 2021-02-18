package com.calculator;

import android.os.Bundle;
import com.facebook.react.ReactActivity;

// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
   
  @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }
    
  @Override
  protected String getMainComponentName() {
    return "Calculator";
  }
}