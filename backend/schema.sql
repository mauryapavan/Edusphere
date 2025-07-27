use sql3792013

create table user(
    user_id varchar(75) primary key,
    username varchar(75) not null,
    email varchar(50) unique not null,
    password varchar(100) not null
)

create table batch(
    batch_id varchar(75) primary key,
    batch_name varchar(75) not null,
    owner varchar(75) not null,
    image varchar(4000)  ,
    price decimal not null
)
create table subject(
    subject_id  varchar(75) primary key,
    subject_name  varchar(75) not null,
    owner  varchar(100) not null,
    batch_id  varchar(80) not null,
    FOREIGN KEY (batch_id) REFERENCES batch(batch_id)

)

create table chapter(
    chapter_id  varchar(75) primary key,
    chapter_name  varchar(75) not null,
    owner  varchar(100) not null,
    subject_id  varchar(80) not null,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
)

create table lecture(
    lecture_id  varchar(75) primary key,
    lecture_name  varchar(75) not null,
    lecture_link varchar(2044) not null,
    owner  varchar(100) not null,
    chapter_id  varchar(80) not null,
    FOREIGN KEY (chapter_id) REFERENCES chapter(chapter_id)
)

create table purchased(
    purchased_id  varchar(75) primary key,
    student_email  varchar(75) not null,
    batch_id varchar(75) not null
)







