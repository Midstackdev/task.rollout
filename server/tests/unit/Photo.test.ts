import { pool } from "../../src/database";
import PhotoModel from "../../src/models/photo";
import { Photo } from "../../src/types";

const photoModel = new PhotoModel();

describe("Photo Module", () => {
  describe("Test methods exists", () => {
    it("should have an create photo method", () => {
      expect(photoModel.create).toBeDefined();
    });
  });

  describe("Test Create Photo Logic", () => {
    const photo = {
      published: 1716929905,
      url: "https://www.flickr.com/photos/199327060@N08/53753580853/",
      tags: "iphone,photography,qatar,middle,east,persian,gulf,sea,amateur,cat,pet",
    } as Photo;

    // beforeAll(async () => {
    //   const createdPhoto = await photoModel.create(photo);
    //   photo.id = createdPhoto.id;
    // });

    // afterAll(async () => {
    //   await pool.connect();

    //   const sql = "DELETE FROM users";
    //   await pool.query(sql);
    //   await pool.end();
    // });
  });
});
