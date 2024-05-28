import { pool } from "../database";
import { Photo } from "../types";

class PhotoModel {
  /** create photo */
  async create(data: Photo): Promise<Photo> {
    try {
      const sql = `INSERT INTO photos (published_date, image_url, tags) VALUES (?, ?, ?)`;
      const rows = await pool.query(sql, [
        new Date(data.published),
        data.url,
        data.tags,
      ]);

      const results = rows[0] as unknown as Photo;
      return results;
    } catch (error) {
      throw new Error(
        `Unable to create (${data.url}): ${(error as Error).message}`
      );
    }
  }
  /** create photo */
  async remove(id: string) {
    try {
      const sql = "DELETE from photos where id=?";
      const result = await pool.query(sql, [id]);
      return result;
    } catch (error) {
      throw new Error(`Unable to delete (${id}): ${(error as Error).message}`);
    }
  }
}

export default PhotoModel;
