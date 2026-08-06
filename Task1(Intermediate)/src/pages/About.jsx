import { useAppContext } from '../App';

const About = () => {
  const { user } = useAppContext();

  return (
    <section className="card">
      <p className="eyebrow">About the experience</p>
      <h2>Designed for clarity and momentum.</h2>
      <p className="lead">This SPA keeps the feel of a native app with instant page changes, lightweight state sharing, and a layout that adapts smoothly from mobile to desktop.</p>
      <p className="lead">Current traveler: {user.name} · {user.role}</p>
      <ul className="feature-list">
        <li>Seamless client-side navigation</li>
        <li>Shared state for a personalized experience</li>
        <li>Modern responsive layout and motion</li>
      </ul>
    </section>
  );
};

export default About;
