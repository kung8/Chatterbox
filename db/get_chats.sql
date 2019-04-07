select room_id, chats.id,message,user_id,first,last 
from chats
join users on users.id = chats.user_id
where room_id ilike ${id1} or room_id ilike ${id2} and user_id != ${id}
