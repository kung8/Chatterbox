create table chats (
id serial primary key,
message text, 
user_id int,
room_id varchar
);

create table group_chat (
group_chat_id serial primary key,
group_name varchar
);

create table group_users (
group_users_id serial primary key,
group_chat_id integer,
user_id integer
);

create table group_messages (
group_message_id serial primary key,
group_chat_id integer,
user_id integer,
message text
);
