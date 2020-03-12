package com.talkjs.basicexample;

import android.content.Context;
import androidx.annotation.Nullable;
import androidx.annotation.StringRes;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

public class SectionsPagerAdapter extends FragmentPagerAdapter {

    @StringRes
    private static final int[] TAB_TITLES = new int[]{R.string.tab_text_1, R.string.tab_text_2};
    private final Context mContext;

    public SectionsPagerAdapter(Context context, FragmentManager fm) {
        super(fm);
        mContext = context;
    }

    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 1:
                return new UsersTab();
            case 0:
            default: return new InboxTab();
        }
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) { return mContext.getResources().getString(TAB_TITLES[position]); }

    @Override
    public int getCount() {
        return TAB_TITLES.length;
    }
}