package com.talkjs.basicexample;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import java.util.ArrayList;
import java.util.List;

public class UsersTab extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View usersTabView = inflater.inflate(R.layout.users_tab, container, false);

        List<String> names = new ArrayList<>();
        for(TalkJSUser user : TalkJSUser.allUsers) {
            names.add(user.name);
        }

        ListView usernamesListView = usersTabView.findViewById(R.id.usernames_list_view);
        usernamesListView.setAdapter(new ArrayAdapter<>(
                requireContext(),
                android.R.layout.simple_list_item_1,
                names)
        );

        usernamesListView.setOnItemClickListener((parent, view, position, id) -> {
            TalkJSUser chatWith = TalkJSUser.allUsers.get(position);
            Intent intent = new Intent(getContext(), ChatboxActivity.class);
            intent.putExtra("chatWith", chatWith);
            intent.putExtra("name", chatWith.name);

            startActivity(intent);
        });

        return usersTabView;
    }
}
