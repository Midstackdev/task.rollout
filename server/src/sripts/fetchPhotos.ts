import axios from "axios";
import { Photo, PhotoId, PhotoIds } from "../types";
import db, { pool } from "../database";
import config from "../config";
import { createFlickr } from "flickr-sdk";

// Search for cat tagged photos
const { flickr } = createFlickr(config.flikerApiKey);
const photoIds: PhotoIds = [];

const getPhotoIds = async () => {
  try {
    const response = await flickr("flickr.photos.search", {
      tags: "cat",
      per_page: "500",
    });

    const picIds = response.photos.photo;
    picIds.forEach((picId: PhotoId) => {
      photoIds.push(picId.id);
    });
    console.log("---pids--", photoIds);
  } catch (error) {
    console.error("Error fetching photo ids:", error);
  }
};

// Fetch and store 500 cat images
const fetchAndStorePhotos = async () => {
  await getPhotoIds();
  let index = 0;
  setTimeout(async () => {
    for (const id of photoIds) {
      index++;
      try {
        const res = await flickr("flickr.photos.getInfo", {
          photo_id: id,
        });
        const hint = res.photo;
        const data = {
          published: +hint.dates.posted,
          url: hint.urls.url[0]._content,
          tags: hint.tags.tag
            .map((tag: { _content: string }) => {
              return tag._content;
            })
            .join(","),
        };
        console.log("--flk---", data);
        pool.query(
          "INSERT INTO photos (published_date, image_url, tags) VALUES (?, ?, ?)",
          [new Date(data.published), data.url, data.tags]
        );
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    }
  }, 500 * index);
};

export { fetchAndStorePhotos };
