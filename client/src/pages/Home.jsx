import { Link } from "react-router-dom"
import "../styles/Home.css"

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to NotesApp</h1>
        <p>A simple and secure way to keep track of your thoughts, ideas, and important information</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <div className="feature-icon">📝</div>
          <h2>Create Notes</h2>
          <p>
            Easily create and organize your notes in one secure place. Add titles, content, and keep everything
            organized.
          </p>
        </div>

        <div className="feature">
          <div className="feature-icon">🔒</div>
          <h2>Secure</h2>
          <p>
            Your notes are private and secure. Only you can access your personal information with our robust
            authentication system.
          </p>
        </div>

        <div className="feature">
          <div className="feature-icon">📱</div>
          <h2>Responsive</h2>
          <p>
            Access your notes from any device - desktop, tablet, or mobile. Your notes sync automatically across all
            platforms.
          </p>
        </div>
      </div>

      {/* New Testimonials Section */}
      <div className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <p className="testimonial-content">
              "This notes app has completely transformed how I organize my thoughts. The interface is intuitive and the
              features are exactly what I needed!"
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">JD</div>
              <div className="testimonial-info">
                <h4>John Doe</h4>
                <p>Student</p>
              </div>
            </div>
          </div>

          <div className="testimonial">
            <p className="testimonial-content">
              "I've tried many note-taking apps, but this one stands out with its clean design and ease of use. It's
              become an essential part of my daily workflow."
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">AS</div>
              <div className="testimonial-info">
                <h4>Alice Smith</h4>
                <p>Designer</p>
              </div>
            </div>
          </div>

          <div className="testimonial">
            <p className="testimonial-content">
              "The security features give me peace of mind knowing my personal notes are protected. Plus, the ability to
              access from any device is incredibly convenient."
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">RJ</div>
              <div className="testimonial-info">
                <h4>Robert Johnson</h4>
                <p>Business Owner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

