select group_chat.*,group_users.group_users_id,email,first,last,username,active,pic from group_chat
join group_users on group_users.group_chat_id = group_chat.group_chat_id
join users on users.id = group_users.user_id
where group_chat.group_chat_id = ${group_chat_id};