create table chats (
id serial primary key,
message text, 
user_id int,
room_id varchar
)