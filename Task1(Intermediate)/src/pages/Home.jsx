import { useAppContext } from '../App';

const Home = () => {
  const { user } = useAppContext();

  return (
    <section className="card hero-card">
      <p className="eyebrow">Fast. Calm. Modern.</p>
      <h1>Build your next idea with a smooth digital experience.</h1>
      <p className="lead">A lightweight SPA with elegant transitions, shared context, and simple navigation across every screen.</p>
      <p className="lead">Welcome back, {user.name} — {user.role}.</p>
      <div className="pill-row">
        <span className="pill">React Router</span>
        <span className="pill">Context State</span>
        <span className="pill">Responsive UI</span>
      </div>
    </section>
  );
};

export default Home;
