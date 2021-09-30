# breakfast-shop-nextauth

## Usage

### Build The Images

### Run

## My Notes

**Port occupied**

```shell
# install net-tools for netstat.
sudo apt-get update -y
sudo apt-get install -y net-tools

sudo netstat -lpn |grep 3000
sudo kill PID
```

---

**Create a database in a mysql container:**

after publish a port from mysql container

```shell
mysql -P 3306 --protocol=tcp -u root -p
```

---

**Start mysql server**

```shell
sudo /etc/init.d/mysql start
sudo /etc/init.d/mysql restart
```

---

[**How can I initialize a MySQL database with schema in a Docker container?**](https://stackoverflow.com/questions/29145370/how-can-i-initialize-a-mysql-database-with-schema-in-a-docker-container)

```yaml
volumes:
  - /home/user/db/mysql/data:/var/lib/mysql
  - /home/user/db/mysql/init:/docker-entrypoint-initdb.d/:ro
```

And in the /home/user/db/mysql/init folder .. drop one sql file, with any name, for example init.sql containing something like :

```sql
CREATE DATABASE mydb;
GRANT ALL PRIVILEGES ON mydb.* TO 'myuser'@'%' IDENTIFIED BY 'mysql';
USE mydb
```

---

**How can I grep for a string that begins with a dash/hyphen?**

```shell
grep -- -X
```

---

[**Nextjs - importing next/document outside of pages/\_document error**](https://stackoverflow.com/questions/69061240/nextjs-importing-next-document-outside-of-pages-document-error)

---

[**Component definition is missing display name react/display-name**](https://stackoverflow.com/questions/52992932/component-definition-is-missing-display-name-react-display-name)
