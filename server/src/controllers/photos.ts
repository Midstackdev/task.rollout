import { NextFunction, Request, Response } from "express";
import { pool } from "../database";
import { Photo, Tag, Tags } from "../types";
import PhotoModel from "../models/photo";

const photoModel = new PhotoModel();

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

    const results = await pool.query("SELECT tags FROM photos");
    const tagResults = results[0] as Tags;
    const tagCounts: Record<string, number> = {};
    tagResults.forEach((row: Tag) => {
      row.tags.split(",").forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map((entry) => entry[0]);
    return res.status(200).json({
      data: rows[0],
      tags: topTags,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const rows = await photoModel.remove(id);
    return res.status(200).json({
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
};
