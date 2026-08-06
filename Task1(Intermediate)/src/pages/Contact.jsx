import { useAppContext } from '../App';

const Contact = () => {
  const { user } = useAppContext();

  return (
    <section className="card">
      <p className="eyebrow">Contact</p>
      <h2>Let’s talk about your next release.</h2>
      <p className="lead">Reach out for collaboration, product ideas, or feedback about the app experience.</p>
      <p className="lead">Preferred contact for {user.name}: {user.role}</p>
      <form className="contact-form">
        <input type="text" placeholder="Your name" />
        <input type="email" placeholder="Your email" />
        <textarea rows="4" placeholder="Tell us more..." />
        <button type="button">Send message</button>
      </form>
    </section>
  );
};

export default Contact;
