define([
    "skylark-langx/langx"
], function(langx) {
    var swt,
        vendors = {},
        namespaceInit;


    var VendorFactory = langx.Evented.inherit({
        klassName : "VendorFactory",

        vendorName : null,

        _types : null,

        init : function(vendorName) {
            this.vendorName = vendorName;
            this._types = {};
        },

        /**
         * Add a new widget type to the factory.
         *
         * @method register
         * @param {String} type Type name for example "button".
         * @param {function} typeClass Class type function.
         */
        add : function(type, klass) {
            this._types[type.toLowerCase()] = klass;
        },

        /**
         * Returns true/false if the specified type exists or not.
         *
         * @method has
         * @param {String} type Type to look for.
         * @return {Boolean} true/false if the control by name exists.
         */
        get: function(type) {
            return this._types[type.toLowerCase()];
        },
        
        /**
         * Returns true/false if the specified type exists or not.
         *
         * @method has
         * @param {String} type Type to look for.
         * @return {Boolean} true/false if the control by name exists.
         */
        has: function(type) {
            return !!this._types[type.toLowerCase()];
        },

        /**
         * Creates a new widget instance based on the settings provided. The instance created will be
         * based on the specified type property it can also create whole structures of components out of
         * the specified JSON object.
         *
         * @example
         * .create({
         *     type: 'button',
         *     text: 'Hello world!'
         * });
         *
         * @method create
         * @param {Object/String} settings Name/Value object with items used to create the type.
         * @return {Widget} Widget instance based on the specified type.
         */
        create: function(type, settings,children) {
            var widgetClass,inst;


            // If string is specified then use it as the type
            if (typeof type == 'string') {
                settings = settings || {};
                settings.type = type;
            } else {
                children = settings;
                settings = type;
                type = settings.type;
            }

            // Find widget type
            type = type.toLowerCase();
            widgetClass = this._types[type];

            // #if debug

            if (!widgetClass) {
                throw new Error("Could not find control by type: " + type);
            }

            // #endif

            inst = new widgetClass(settings);

            return inst;
        }


    });


    swt = vendors["swt"] = new VendorFactory("swt");


    return {
        /**
         * Register a new widget factory by the vendor.
         *
         * @method register
         * @param {String} vendor Vendor name for example "jquey","react".
         * @param {function} typeClass Class type function.
         */
        register : function(vendor) {
            vendor = vendor.toLowerCase();
            if (vendors[vendor]) {
                throw new Error("The vendor is been existed:" + vendor);
            }
            return vendors[vendor] = new VendorFactory(vendor);
        },

        getFactory : function(vendor) {
            if (vendor) {
                vendor = vendor.toLowerCase();
                return vendors[vendor];
            }
            return swt;
        },


        create : function(type, settings,children) {
            // If string is specified then use it as the type
            if (typeof type == 'string') {
                settings = settings || {};
                settings.type = type;
            } else {
                children = settings;
                settings = type;
                type = settings.type;
            }

            // Find widget type
            type = type.toLowerCase();

            var splitts = type.split("@"),
                vendor =  splitts[1],
                factory = this.get(vendor);       
            type = splitts[0];

            return factory.create(type,settings,children);

        }



    };

});
