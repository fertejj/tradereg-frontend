import PropTypes from "prop-types";

const TestimonialCard = ({ quote, author }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow">
    <p className="italic">"{quote}"</p>
    <p className="mt-4 text-right font-bold">- {author}</p>
  </div>
);

TestimonialCard.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default TestimonialCard;
