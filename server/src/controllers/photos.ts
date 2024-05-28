import { NextFunction, Request, Response } from "express";
import { pool } from "../database";

export const getPhotos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page = 1, tag } = req.query;
  const limit = 10;
  const offset = (+page - 1) * limit;

  let query = "SELECT * FROM photos";
  let params = [];

  if (tag) {
    query += " WHERE FIND_IN_SET(?, tags)";
    params.push(tag);
  }

  query += " ORDER BY published_date DESC LIMIT ? OFFSET ?";
  params.push(limit, offset);
  try {
    const rows = await pool.query(query, params);
    console.log("ror", rows[0]);
    return res.status(200).json({
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }

  //   pool.query(query, params, (err, results) => {
  //     if (err) throw err;

  //     // Fetch top 10 tags
  //     pool.query("SELECT tags FROM photos", (err, tagResults) => {
  //       if (err) throw err;

  //       const tagCounts = {};
  //       tagResults.forEach((row) => {
  //         row.tags.split(",").forEach((tag) => {
  //           tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  //         });
  //       });

  //       const topTags = Object.entries(tagCounts)
  //         .sort((a, b) => b[1] - a[1])
  //         .slice(0, 10)
  //         .map((entry) => entry[0]);

  //       res.render("index", { photos: results, topTags, currentPage: page });
  //     });
  //   });
};

export const deletePhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const sql = "DELETE from photos where id=?";
    const rows = await pool.query(sql, [id]);
    return res.status(200).json({
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
};
