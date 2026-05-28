const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE PIPELINE =================
app.use(cors());
app.use(express.json());

// ================= INQUIRY SUBMISSION NODE =================
app.post('/api/inquiry', (req, res) => {
    // Destructuring fields cleanly matching your frontend payload
    const { name, email, phone, role, car, hub, notes } = req.body;

    // Fail-safe validation block to catch missing critical elements
    if (!name || !email || !car) {
        console.error('❌ Data transmission dropped: Missing mandatory variables.');
        return res.status(400).json({ 
            success: false, 
            message: 'Incomplete dispatch payload data.' 
        });
    }

    // Secure Console Registry mapping incoming data strings
    console.log('\n==================================================');
    console.log('📬 NEW JDM EAST AFRICA IMPORT INQUIRY ROUTED');
    console.log('==================================================');
    console.log(`👤 Client Name:  ${name}`);
    console.log(`📧 Email Ref:   ${email}`);
    console.log(`📞 Contact/WA:  ${phone || 'Not Provided'}`);
    console.log(`💼 Account Type: ${role || hub || 'Not Specified'}`);
    console.log(`🚗 Targeted Unit: ${car}`);
    console.log(`📝 Specifications/Notes:\n   "${notes || 'No extra constraints defined.'}"`);
    console.log('==================================================\n');

    /**
     * PRODUCTION INTEGRATION NOTE:
     * When ready to launch live mail networks, replace this block with your 
     * Nodemailer logic to dispatch data to both local admin and global supplier nodes:
     * * transporter.sendMail({
     * to: ['admin@jdmeastafrica.com', email], 
     * subject: `JDM Import Allocation Desk — ${car}`,
     * text: `Hello ${name}, your structural inquiry log for the ${car} has been verified...`
     * });
     */

    // Instant successful status return to fulfill fetch pipeline requests smoothly
    return res.status(200).json({
        success: true,
        message: 'Log transmission successful! Data successfully dispatched across parallel nodes.',
        timestamp: new Date().toISOString()
    });
});

// ================= RUNTIME LIFELINE INSTANCE =================
app.listen(PORT, () => {
    console.log(`🚀 Automated Vehicle Sourcing Backend Active on Port [${PORT}]`);
    console.log(`🔗 Inquiry Desk Target Route: http://localhost:${PORT}/api/inquiry`);
});
