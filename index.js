import {render} from 'react-dom'
import Flipboard from 'lib/flipboard.js'

const style = {
  flipboard: {
    margin: '30px auto',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
  },
  bigImage: {
    height: '320px',
    width: '320px'
  },
  smallImage: {
    height: '80px',
    width: '140px'
  },
  padded: {padding: 10},
  vertical: {
    display: 'flex',
    flexDirection: 'column'
  },
  horizontal: {
    display: 'flex'
  },
  headerBackground: {
    background: 'url(images/home-demo.jpg)',
    height: '320px',
    position: 'relative',
    width: '320px'
  },
  headerTitle: {
    bottom: 0,
    color: '#fff',
    fontSize: 30,
    padding: '0 10px',
    position: 'absolute'
  },
  thumb: {
    flexGrow: 1,
    padding: 10
  }
}

render((
  <Flipboard
    height={480}
    width={320}
    style={style.flipboard}>
    <article>
      <img src="images/home.jpg" style={style.bigImage} />
      <p style={style.padded}>The image above is a square of 320x320. It's useful to see the perspective effect when swicthing pages.</p>
    </article>
    <article style={style.padded}>
      <p>A web demo wouldn't be complete without the famous Lorem Ipsum!</p>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel vehicula neque, quis bibendum orci. Integer vel facilisis magna, quis rhoncus justo. Sed efficitur ipsum eget tristique fermentum. In ut orci non nulla ullamcorper condimentum gravida at odio. Nulla rutrum nunc eu arcu maximus mollis. Nam ut felis eleifend, mattis metus non, sodales libero. Maecenas vel aliquet libero. Aenean sit amet ipsum pellentesque, convallis diam a, convallis lectus.</p>

      <p>In id mauris at mauris sollicitudin convallis. Aliquam tempus eleifend metus. Nulla vel porta enim. In at lorem vel nunc rutrum vulputate non vel est. Vivamus vehicula pharetra elit sit amet fermentum. Fusce lacinia dignissim magna eu pharetra. Vivamus non euismod est. Praesent egestas scelerisque arcu nec tristique. Vivamus aliquam eleifend turpis, eget pulvinar metus fermentum ut.</p>

      <p>Sed nec arcu mi. Vivamus et rutrum enim. Sed sem ex, suscipit quis maximus ut, facilisis a leo. Donec sit amet rutrum velit. Praesent volutpat a quam nec ultricies. In venenatis sodales ullamcorper. Nam ac dignissim augue. Nam aliquet nibh velit, nec fringilla nulla accumsan nec. Fusce et ultricies nibh, et ullamcorper est. Ut id mi laoreet ante auctor dignissim id et leo. Praesent tincidunt eros ut facilisis varius. Ut ornare ante a congue bibendum. Nullam ac metus in sapien dignissim egestas. Fusce in tellus eget purus ornare tempor eget eget augue. Nam et imperdiet augue. In vel urna porta, finibus nunc quis, tempor tortor.</p>
    </article>
    <article style={style.vertical}>
      <section style={style.headerBackground}>
        <h1 style={style.headerTitle}>Demo homepage with a multi-line title</h1>
      </section>

      <section style={style.horizontal}>
        <section style={style.thumb}>
          <img src="images/left.jpg" style={style.smallImage} />
          There's a cool landscape
        </section>
        <section style={style.thumb}>
          <img src="images/right.jpg" style={style.smallImage} />
          There's another one
        </section>
      </section>
    </article>
  </Flipboard>
), document.querySelector('#app'))
