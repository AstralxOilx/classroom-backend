import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    await prisma.userRole.createMany({
        data: [
            { name: "student" },
            { name: "teacher" }
        ],
        skipDuplicates: true,
    });

    await prisma.accoutStatus.createMany({
        data: [
            { name: "active" },
            { name: "admin" },
            { name: "ban" }
        ],
        skipDuplicates: true,
    });

    await prisma.classRole.createMany({
        data: [ 
            { name: "teacher" },
            { name: "teaching assistant" },
            { name: "student" },
            { name: "leader" },
        ],
        skipDuplicates: true,
    });

    await prisma.status.createMany({
        data: [
            { name: "private" },
            { name: "within" },
            { name: "publish" }
        ],
        skipDuplicates: true,
    });
    
    await prisma.classRoomStatus.createMany({
        data: [
            { name: "private" }, 
            { name: "publish" }
        ],
        skipDuplicates: true,
    });

    await prisma.permission.createMany({
        data: [
            { name: "pending" },
            { name: "join" },
            { name: "ban" }
        ],
        skipDuplicates: true,
    })

    await prisma.colors.createMany({
        data: [
            { name: 'gray' },
            { name: 'orange' },
            { name: 'amber' },
            { name: 'yellow' },
            { name: 'lime' },
            { name: 'green' },
            { name: 'emerald' },
            { name: 'teal' },
            { name: 'cyan' },
            { name: 'sky' },
            { name: 'blue' },
            { name: 'indigo' },
            { name: 'violet' },
            { name: 'purple' },
            { name: 'fuchsia' },
            { name: 'pink' },
            { name: 'rose' },
            { name: 'red' },
        ],
        skipDuplicates: true,
    });

    await prisma.subJects.createMany({
        data: [
            { name: 'linguistics' },
            { name: 'mathematics and science' },
            { name: 'social sciences' },
            { name: 'arts and design' },
            { name: 'occupational and technology studies' },
            { name: 'health and physical education' },
            { name: 'business and economics' },
            { name: 'other' },
        ],
        skipDuplicates: true,
    })

    await prisma.checkInStatus.createMany({
        data: [
            { name: 'present' },
            { name: 'late' },
            { name: 'absent' },
            { name: 'excused' },
        ],
        skipDuplicates: true,
    })
}

main()
    .then(() => {
        console.log('Seed data added successfully!');
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
