import styles from ".//singlePost.module.css";
import Image from "next/image";

const getData = async (slug) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);

  if (!res) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

const SinglePostPage = async ({ params }) => {
  const { slug } = params;

  const post = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="https://images.pexels.com/photos/17081188/pexels-photo-17081188.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          alt="About image"
          fill
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Image
            src="https://images.pexels.com/photos/17081188/pexels-photo-17081188.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            className={styles.avatar}
            width={50}
            height={50}
          />

          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>Jerry</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>07.03.2023</span>
          </div>
        </div>
        <div className={styles.content}>{post.body}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
