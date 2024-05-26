CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users(
    user_id UUID DEFAULT uuid_generate_v4(),
	user_name varchar(250) NOT NULL,
	user_email varchar(250) NOT NULL UNIQUE,
	user_password varchar(250) NOT NULL,
	user_role varchar(250) NOT NULL
    PRIMARY KEY(user_id);
)


CREATE TABLE BOOKS(
    id UUID DEFAULT uuid_generate_v4(),
    title varchar(250) NOT NULL,
    author varchar(250) NOT NULL,
    publishedDate DATE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    seller_id varchar(250) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(seller_id) REFERENCES Users(user_email)
)