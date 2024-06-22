export const calculateGradeAndPoints = (totalMarks: number) => {
  let result = {
    grade: 'NA',
    gradePoints: 0,
  };
  /**
   * 0-32f
   * 33-39 D
   * 40-59 C
   * 60-79 B
   * 80-100 A
   */

  if (totalMarks >= 0 && totalMarks <= 32) {
    result = { grade: 'F', gradePoints: 0.0 };
  } else if (totalMarks >= 33 && totalMarks <= 39) {
    result = { grade: 'D', gradePoints: 2.0 };
  } else if (totalMarks >= 40 && totalMarks <= 59) {
    result = { grade: 'C', gradePoints: 3.0 };
  } else if (totalMarks >= 60 && totalMarks <= 79) {
    result = { grade: 'B', gradePoints: 3.5 };
  } else if (totalMarks >= 80 && totalMarks <= 100) {
    result = { grade: 'A', gradePoints: 4.0 };
  } else {
    result = { grade: 'NA', gradePoints: 0 };
  }
  return result;
};
