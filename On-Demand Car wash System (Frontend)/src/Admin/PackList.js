import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PackList = () => {
  const [packs, setPacks] = useState([]);
  const [newPack, setNewPack] = useState('');

  useEffect(() => {
    fetchPacks();
  }, []);

  const fetchPacks = async () => {
    try {
      const response = await axios.get('http://localhost:9090/admin/allpacks');
      setPacks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPack = async () => {
    try {
      const response = await axios.post('http://localhost:9090/admin/addpack', { name: newPack });
      setPacks([...packs, response.data]);
      setNewPack('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePack = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/admin/delete/${id}`);
      setPacks(packs.filter((pack) => pack.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Wash Packs</h1>
      <div>
        <input
          type="text"
          value={newPack}
          onChange={(e) => setNewPack(e.target.value)}
        />
        <button onClick={handleAddPack}>Add Pack</button>
      </div>
      <ul>
        {packs.map((pack) => (
          <li key={pack.id}>
            {pack.name}
            <button onClick={() => handleDeletePack(pack.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackList;
