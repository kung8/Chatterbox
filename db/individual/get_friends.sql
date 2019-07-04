select id,first,last,email,username,pic 
from users
where id != ${id}
order by id 