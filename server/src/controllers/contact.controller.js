import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define el schema aquí mismo temporalmente
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['unread', 'read', 'replied'],
        default: 'unread'
    }
}, {
    timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

// 📤 Enviar mensaje de contacto
export const submitContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Crear nuevo mensaje de contacto
        const newContact = new Contact({
            name,
            email,
            phone,
            subject,
            message,
            status: 'unread'
        });

        await newContact.save();

        res.status(201).json({
            message: "Mensaje enviado correctamente. Te contactaremos pronto.",
            contactId: newContact._id
        });
    } catch (error) {
        console.error("Error al enviar mensaje de contacto:", error);
        res.status(500).json({ 
            message: "Error interno del servidor al procesar tu mensaje" 
        });
    }
};

// 📥 Obtener todos los mensajes (admin)
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
            .sort({ createdAt: -1 })
            .select('-__v');

        res.json(contacts);
    } catch (error) {
        console.error("Error al obtener mensajes de contacto:", error);
        res.status(500).json({ 
            message: "Error interno del servidor al obtener los mensajes" 
        });
    }
};

// 🗑️ Eliminar mensaje (admin)
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({ 
                message: "Mensaje de contacto no encontrado" 
            });
        }

        res.json({ 
            message: "Mensaje de contacto eliminado correctamente" 
        });
    } catch (error) {
        console.error("Error al eliminar mensaje de contacto:", error);
        res.status(500).json({ 
            message: "Error interno del servidor al eliminar el mensaje" 
        });
    }
};