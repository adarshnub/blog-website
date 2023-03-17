export default function Post() {
    return(
        <div className="post">
        <div className="image">
          <img src="https://images.unsplash.com/photo-1661956601031-4cf09efadfce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60" />
        </div>

        <div className="texts">
          <h2>Heading of the post</h2>
          <p className="info">
            <a className="author">Adarsh</a>
            <time>2023-01-06 16:45</time>
          </p>
          <p className="summary">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    );
}