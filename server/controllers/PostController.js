import postDb from '../models/posts';

/**
 * @class PostController
 * @description Specifies which method handles a given request for a specific endpoint
 * @exports PostController
 */

class PostController {
  /**
   * @method getRecords
   * @description Retrieves a list of records
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static getRecords(req, res) {
    res.status(200).json({ status: 200, data: [...postDb] });
  }

  /**
   * @method getARecord
   * @description Retrieves a specific record with a given iID
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static getARecord(req, res) {
    const data = postDb.filter(recordObj => Number(req.params.id) === recordObj.id);
    res.status(200).json({ status: 200, data });
  }

  /**
   * @method postRecord
   * @description Posts the given record to the database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static postRecord(req, res) {
    const {
      type, comment, latitude, longitude,
    } = req.body;

    const id = postDb.length + 1;
    const recordData = {
      id,
      comment,
      type,
      location: `${latitude}, ${longitude}`,
      createdOn: new Date(),
      createdBy: 8,
      status: 'drafted',
      images: [],
      videos: [],
    };

    postDb.concat(recordData);

    res.status(201).json({
      status: 201,
      data: [{ id, message: `Created ${type} record` }],
    });
  }

  /**
   * @method updateLocation
   * @description Updates the location of a specific record with a given ID
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static updateLocation(req, res) {
    const { latitude, longitude } = req.body;
    const recordID = Number(req.params.id);

    postDb.forEach((record, recordIndex) => {
      if (recordID === record.id) {
        postDb[recordIndex].location = `${latitude}, ${longitude}`;
      }
    });

    res.status(200).json({
      status: 200, data: [{ id: recordID, message: 'Updated red-flag record\'s location' }],
    });
  }

  /**
   * @method updateComment
   * @description Updates the comment associated with a specific record
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static updateComment(req, res) {
    const recordID = Number(req.params.id);
    const { comment } = req.body;

    postDb.forEach((record, recordIndex) => {
      if (recordID === record.id) {
        postDb[recordIndex].comment = `${comment}`;
      }
    });

    res.status(200).json({
      status: 200, data: [{ id: recordID, message: 'Updated red-flag record\'s comment' }],
    });
  }

  /**
   * @method deleteRecord
   * @description Deletes a specific record
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static deleteRecord(req, res) {
    const recordID = Number(req.params.id);

    postDb.forEach((record, recordIndex) => {
      if (recordID === record.id) {
        postDb.splice(recordIndex, 1);
      }
    });

    res.status(200).json({
      status: 200, data: [{ id: recordID, message: 'red-flag record has been deleted' }],
    });
  }
}

export default PostController;
