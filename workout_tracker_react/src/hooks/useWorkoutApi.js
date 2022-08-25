import { useState } from "react";
import { loadAuthToken } from "../utils/local-storage";
import API_BASE_URL from "../config";

export default function useWorkoutApi() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function getAllWorkouts() {
    setLoading(true);
    setError(false);
    const authToken = loadAuthToken();
    return fetch(`${API_BASE_URL}/workout`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        setLoading(false);
        setError(true);
        return err;
      });
  }

  function getAWorkout(workoutID) {
    setLoading(true);
    setError(false);
    const authToken = loadAuthToken();
    return fetch(`${API_BASE_URL}/workout/${workoutID}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        setLoading(false);
        setError(true);
        return err;
      });
  }

    async function deleteAWorkout(workoutID) {
      setLoading(true);
      setError(false);
      const authToken = loadAuthToken();
      return fetch(`${API_BASE_URL}/workoutlog/${workoutID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((res) => res.status)
        .then(() => "Success")
        .catch((err) => {
          setLoading(false);
          setError(true);
          return err;
        });
    }

  return {
    error,
    loading,
    getAllWorkouts,
    getAWorkout,
    deleteAWorkout,
  };
}
