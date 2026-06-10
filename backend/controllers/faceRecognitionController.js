const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const FaceLog = require('../models/FaceLog');

exports.markFaceAttendance = async (
    req,
    res
) => {

    try {

        const {

            studentName,
            course,
            confidence

        } = req.body;

        const student =
            await Student.findOne({

                name: studentName

            });

        if (!student) {

            return res.status(404).json({

                message:
                    'Student not found'

            });

        }

        const today = new Date();

        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
        );

        const existingAttendance =
            await Attendance.findOne({

                student:
                    student._id,

                date: {

                    $gte:
                        startOfDay,

                    $lt:
                        endOfDay

                }

            });

        if (existingAttendance) {

            return res.status(400).json({

                message:
                    'Attendance already marked today'

            });

        }

        const attendance =
            await Attendance.create({

                student:
                    student._id,

                course,

                status:
                    'Present'

            });
        await FaceLog.create({

            student:
                student._id,

            confidence,

            status:
                'Attendance Marked'

        });

        res.status(201).json({

            message:
                'Attendance marked successfully',

            attendance

        });

    }

    catch (err) {

        res.status(500).json({

            message:
                err.message

        });

    }

};

exports.getFaceLogs = async (
  req,
  res
) => {

  try {

    const logs =
      await FaceLog.find()
        .populate('student')
        .sort({
          timestamp: -1
        });

    res.json(logs);

  }

  catch (err) {

    res.status(500).json({

      message:
        err.message

    });

  }

};