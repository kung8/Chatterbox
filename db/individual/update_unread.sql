update unread 
set unread = ${unread}
where sender_id = ${id} and receiver_id = ${friend_id}