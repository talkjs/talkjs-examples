package com.reactnavigationexample;

import android.content.Context;
import com.facebook.react.ReactInstanceManager;

/**
 * Class responsible for loading Flipper inside your React Native application. This is the release
 * flavour of it so it's empty as we don't want to load Flipper.
 */
public class ReactNativeFlipper {
    public static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
        // Do nothing as we don't want to intialize Flipper on Release.
    }
}