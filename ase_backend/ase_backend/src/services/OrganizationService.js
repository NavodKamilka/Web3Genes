const OrganizationModel = require('../models/organization');
const {
  CONFLICT,
  NF,
  UNAUTHORIZED,
  BAD,
  OK,
} = require('../constants');

class OrganizationService {

  static async updateOne(oid, body) {
    const updatedOrg = await OrganizationModel.findByIdAndUpdate(
      oid,
      { $set: body },
      { new: true },
    );

    return updatedOrg;
  }

  static async findById(oid) {
    const organization = await OrganizationModel.findById(oid);
    return organization;
  }


  static async findByRegNo(regNo) {
    const organization = await OrganizationModel.findOne({
      org_reg_no: regNo,
    });

    return organization;
  }

  static async getAll() {
    const organization = await OrganizationModel.find();
    return organization;
  }

  static async validateExistingFacultyId(oid, lFaculties) {
    const mFaculties = lFaculties.filter((f) => f._id);
    const mFacultyIds = mFaculties.map((f) => f._id);

    if (mFacultyIds.length !== [...new Set(mFacultyIds)].length) {
      return {
        status: 409,
        validate: false,
        data: 'Duplicate _ids found for faculties',
        type: CONFLICT,
      };
    }

    const organization = await OrganizationModel.findById(oid);

    if (!organization) {
      return {
        status: 404,
        validate: false,
        data: 'Organization not found',
        type: NF,
      };
    }

    const eFaculties = organization.faculties;

    if (!eFaculties.length) {
      if (!mFaculties.length) {
        return {
          status: 200,
          validate: true,
          data: 'Validation successfull',
          type: OK,
        };
      }
      return {
        status: 404,
        validate: false,
        data: `Object id ${mFaculties[0]._id} is not exist under organization > faculty`,
        type: NF,
      };
    }

    if (!mFaculties.length) {
      return {
        status: 400,
        validate: false,
        data: 'Request must contain all the existing faculties of the organization 1',
        type: BAD,
      };
    }

    let founded = 0;
    for (let i = mFaculties.length - 1; i >= 0; i--) {
      const faculty = eFaculties.find(
        (f) => f._id.toString() === mFaculties[i]._id,
      );

      if (!faculty) {
        return {
          status: 404,
          validate: false,
          data: `${mFaculties[i]._id} not exist under faculties`,
          type: NF,
        };
      }

      founded += 1;
    }

    if (founded !== eFaculties.length) {
      return {
        status: 400,
        validate: false,
        data: 'Request must contain all the existing faculties of the organization',
        type: BAD,
      };
    }
    return {
      status: 200,
      validate: true,
      data: 'Validation successfull',
      type: OK,
    };
  }

  static async checkNonExistingContactId(oid, lContacts) {
    const organization = await OrganizationModel.findById(oid);

    const oContacts = organization.org_contact_nums.map((c) => c._id.toString());

    let founded = 0;

    for (let i = lContacts.length - 1; i >= 0; i--) {
      if (Object.prototype.hasOwnProperty.call(lContacts[i], '_id')) {
        const contact = oContacts.find((c) => c === lContacts[i]._id);

        if (!contact) {
          return {
            status: 404,
            validate: false,
            data: `Object id ${lContacts[i]._id} is not exist under orgnization > org_contact_nums`,
            type: NF,
          };
        }

        founded += 1;
      }
    }

    if (founded !== oContacts.length) {
      return {
        status: 400,
        validate: false,
        data: 'Missing contact numbers',
        type: BAD,
      };
    }
    return {
      status: 200,
      validate: true,
      data: 'Validation successfull',
      type: OK,
    };
  }

  static async validateExistingFacultyPrograms(oid, lFaculties) {
    const mFaculties = lFaculties.filter((f) => f._id);
    const mFacultyIds = mFaculties.map((f) => f._id);

    if (mFacultyIds.length !== [...new Set(mFacultyIds)].length) {
      return {
        status: 409,
        validate: false,
        data: 'Duplicate _ids found for faculties',
        type: CONFLICT,
      };
    }

    const organization = await OrganizationModel.findById(oid);

    if (!organization) {
      return {
        status: 404,
        validate: false,
        data: 'Organization not found',
        type: NF,
      };
    }

    const eFaculties = organization.faculties;

    if (!eFaculties.length) {
      if (!mFaculties.length) {
        return {
          status: 200,
          validate: true,
          data: 'Success',
          type: OK,
        };
      }
      return {
        status: 404,
        validate: false,
        data: `Object id ${mFaculties[0]._id} is not exist under organization > faculty`,
        type: NF,
      };
    }

    if (!mFaculties.length) {
      return {
        status: 400,
        validate: false,
        data: 'Request must contain all the existing faculties of the organization',
        type: BAD,
      };
    }

    let founded = 0;
    for (let i = mFaculties.length - 1; i >= 0; i--) {
      const faculty = eFaculties.find(
        (f) => f._id.toString() === mFaculties[i]._id
            && JSON.stringify(f.programs)
              === JSON.stringify(mFaculties[i].programs),
      );

      if (!faculty) {
        return {
          status: 401,
          validate: false,
          data: `Not allowed to modify faculty: ${mFaculties[i]._id} ->programs`,
          type: UNAUTHORIZED,
        };
      }

      founded += 1;
    }

    if (founded !== eFaculties.length) {
      return {
        status: 400,
        validate: false,
        data: 'Request must contain all the existing faculties of the organization',
        type: BAD,
      };
    }
    return {
      status: 200,
      validate: true,
      data: 'Validation successfull',
      type: OK,

    };
  }
}

module.exports = OrganizationService;
