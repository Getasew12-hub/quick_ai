import sql from "../config/Database.js";

export const getUserCreations = async (req, res) => {
  
  try {
    const { userId } = req.auth();

    const userData =
      await sql`SELECT *  FROM creations WHERE user_id=${userId} ORDER BY create_at DESC LIMIT 10 `;
    const totalCreation =
      await sql`SELECT COUNT(*) AS total_creation FROM creations WHERE user_id=${userId}`;

    res.status(200).json({
      sucess: true,
      data: userData,
      T_creation: totalCreation[0].total_creation,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};
export const publishCreations = async (req, res) => {
  try {
    const userData =
      await sql`SELECT * FROM creations WHERE publish=true  ORDER BY created_at DESC`;

    res.status(200).json({ sucess: true, data: userData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

export const likeToogle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.params;

    const creation = await sql`SELECT * FROM creations WHERE id=${id}`;

    if (!creation || creation.length === 0) {
      return res
        .status(404)
        .json({ sucess: false, message: "Creation not found" });
    }

    const isLiked = creation[0].likes.includes(userId);
    const likes = creation[0].likes;
    let message;
    let updateLikes;

    if (isLiked) {
      updateLikes = likes.filter((like) => like !== userId);
      message = "Unliked successfully";
    } else {
      updateLikes = [...likes, userId];
      message = "Liked successfully";
    }

    await sql`UPDATE creations SET likes=${updateLikes} WHERE id=${id}`;

    return res.status(200).json({ sucess: true, message });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};
