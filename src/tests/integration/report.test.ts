import request from 'supertest';
import app from '../../app';
import { prisma } from '../../config/db';
import { clearDB } from '../helpers';

describe('Report routes (integration)', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('returns summary via /reports/summary', async () => {
        const userRes = await request(app)
            .post('/auth/register')
            .send({ name: 'Rep', email: 'rep@example.com', password: '123456' });
        expect(userRes.status).toBe(201);
        const jwt = require('jsonwebtoken');
        const token = jwt.sign(userRes.body, process.env.JWT_SECRET || 'secret');

        await prisma.purchaseRequest.createMany({ data: [
            { userId: userRes.body.id, status: 'draft' },
            { userId: userRes.body.id, status: 'approved' },
            { userId: userRes.body.id, status: 'approved' }
        ] });

        const res = await request(app)
            .get('/reports/summary')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        const draft = res.body.find((s: any) => s.status === 'draft');
        const approved = res.body.find((s: any) => s.status === 'approved');
        expect(draft._count.status).toBe(1);
        expect(approved._count.status).toBe(2);
    });
});
