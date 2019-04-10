select first,last,username, message,chats.id, room_id,user_id  
from chats
join users on users.id = chats.user_id
where room_id = ${room}