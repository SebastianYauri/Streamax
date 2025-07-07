
import { useState, useEffect } from "react";

export function useCrudApi({ baseUrl, adaptIn, adaptOut }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/listar`);
      const json = await res.json();
      setData(Array.isArray(json) ? json.map(adaptIn) : []);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const create = async (form) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`${baseUrl}/guardar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adaptOut(form)),
      });
      await fetchAll();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, form) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`${baseUrl}/editar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adaptOut(form)),
      });
      await fetchAll();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`${baseUrl}/eliminar/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      await fetchAll();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  return { data, loading, error, create, update, remove, refetch: fetchAll };
}
