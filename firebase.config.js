module.exports = {
    project: 'meetup-e1533',
    getConfig: function() {
        return {
            apiKey: 'AIzaSyDL70y7VLlY8jWFkXT5eSpNcUa1kignd_E',
            authDomain: this.project + '.firebaseapp.com',
            databaseURL: 'https://' + this.project + '.firebaseio.com',
            storageBucket: this.project + '.appspot.com'
        }
    },
    CONSTANTS: {
        REFS: {
            USERS: 'users',
            MEETUPS: 'meetups'
        }
    }
};

