import PropTypes from "prop-types";

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-gray-700 p-6 rounded-lg shadow">
    <div className="grid grid-cols-2 gap-4 items-center  justify-center">
      <div className="text-[80px] place-items-center">{icon}</div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default FeatureCard;
