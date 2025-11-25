import mongoose from 'mongoose';

// Definición del schema
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

// Crear el modelo
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// 📤 Enviar mensaje de contacto
export const submitContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validación básica
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                message: "Todos los campos obligatorios deben ser completados"
            });
        }

        // Crear nuevo mensaje de contacto
        const newContact = new Contact({
            name,
            email,
            phone: phone || '',
            subject,
            message
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

// 📥 Obtener todos los mensajes (admin) - AÑADE ESTA FUNCIÓN
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

// 🗑️ Eliminar mensaje (admin) - AÑADE ESTA FUNCIÓN
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar que el ID sea válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                message: "ID de mensaje no válido" 
            });
        }

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