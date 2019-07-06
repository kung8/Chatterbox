select first,last,pic,id,username,email,active, unread
from users
join unread on unread.sender_id = users.id
where sender_id = ${id1} and receiver_id = ${id} 
order by id asc