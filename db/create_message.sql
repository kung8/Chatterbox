insert into chats (message,user_id,room_id)
values (${message},${id},${room});

select message,chats.id,user_id,room_id,users.first,users.last  
from chats
join users on users.id = chats.user_id
where room_id = ${room}
order by chats.id