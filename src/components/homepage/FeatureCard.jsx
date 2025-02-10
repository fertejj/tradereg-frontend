import PropTypes from "prop-types";

const FeatureCard = ({ title, description }) => (
  <div className="bg-gray-700 p-6 rounded-lg shadow">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureCard;
