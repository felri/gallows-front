const createUser = async ({ name, password }) => {
  try {
    const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/api/player`, {
      method: 'post',
      mode: 'cors',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
      }),
    });
    const data = await resp.json();
    return data;
  } catch (e) {
    throw Error(e);
  }
};

const getUser = async ({ name, password }) => {
  try {
    const resp = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/get_player`,
      {
        method: 'post',
        mode: 'cors',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
        }),
      }
    );
    const data = await resp.json();
    return data;
  } catch (e) {
    throw Error(e);
  }
};

const getSecondUser = async ({ name, password }) => {
  try {
    const resp = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/second_player`,
      {
        method: 'post',
        mode: 'cors',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
        }),
      }
    );
    const data = await resp.json();
    return data;
  } catch (e) {
    throw Error(e);
  }
};

const setScore = async ({ player_id, points, ai }) => {
  try {
    const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/api/game`, {
      method: 'post',
      mode: 'cors',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player_id,
        points,
        ai,
      }),
    });
    const data = await resp.json();
    return data;
  } catch (e) {
    throw Error(e);
  }
};

const getWord = async () => {
  try {
    const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/api/get_word`, {
      method: 'get',
      mode: 'cors',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();
    return data;
  } catch (e) {
    throw Error(e);
  }
};

const getScoreboard = async ({ ai }) => {
  try {
    const resp = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/get_score`,
      {
        method: 'post',
        mode: 'cors',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ai,
        }),
      }
    );
    const data = await resp.json();
    return data;
  } catch (e) {
    throw Error(e);
  }
};

export default {
  createUser,
  getUser,
  getSecondUser,
  getWord,
  setScore,
  getScoreboard,
};
