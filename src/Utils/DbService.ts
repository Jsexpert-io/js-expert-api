
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient()



// write a function whch takes two matrices and provide the dot product of them 
const dotProduct = (matrix1: number[][], matrix2: number[][]) => {
    const result: number[][] = [];
    let sum = 0;
    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix2[0].length; j++) {
            for (let k = 0; k < matrix2.length; k++) {
                sum += matrix1[i][k] * matrix2[k][j];
            }
            result[i][j] = sum;
            sum = 0;
        }
    }
    return result;
}