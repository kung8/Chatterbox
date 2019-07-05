select id,first,last,email,username,pic,active 
from users
where id != ${id}
order by id 