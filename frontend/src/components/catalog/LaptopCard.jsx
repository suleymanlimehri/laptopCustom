import { useNavigate } from 'react-router-dom';
import '../../App.css';

export default function LaptopCard({ laptop }) {
  const navigate = useNavigate();

const handleConfigure = () => {
  navigate(`/catalog/${laptop._id}`);
};

  return (
    <div className="laptop-card" onClick={handleConfigure}>
      <img src={laptop.image} alt={laptop.name} className="laptop-image" />
      <h3>{laptop.name}</h3>
      <p className="laptop-price">${laptop.price}</p>
    </div>
  );
}
