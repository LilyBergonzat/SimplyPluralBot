// interface Message {
//     name string[];
//     description string;
//     title string;
//     text string;
// }

module.exports = [
    {
        names: [
            "add-friend",
            "add-friends",
            "addfriend",
            "af",
        ],
        description: 'Explains how to troubleshoot not being able to add a friend.',
        title: "Add friend",
        "text":
            'If you and your friends are unable to add each other as friends, or can\'t find each other as friends, ' +
            'make sure that you are using a case sensitive username when adding each other. Additionally, it is ' +
            'currently not possible to add people by their user ID, so if you are using a user id to add them as ' +
            'friend this currently does not work but will in the future.'
    },
    {
        names: [
            "add-set-front",
            'addsetfront',
            'addset-front',
            'add-setfront',
            'add-set',
            'addset',
            'add-front',
            'addfront',
            'set-front',
            'setfront',
            'asf',
        ],
        description: 'Talks about how to set who is fronting in the application.',
        title: "Add / set front",
        text:
            'There are two ways in-app to show a member as fronting. Set as front, and add to front.\n' +
            '\n' +
            'Using set as front will clear all members from your front list, and then add that member. Add to front ' +
            'won\'t remove anyone from the list, but it will add the member whose add icon you tapped. You can ' +
            'individually remove members by tapping the downward facing arrow next to their name.'
    },
    {
        names: [
            "custom-fields",
            "customfields",
            "customfield",
            "cfi",
        ],
        description: 'Talks about the "custom fields" feature.',
        title: "Custom fields",
        text:
            'The ability to change the fields shown on your member lists is planned. This feature will also bring ' +
            'the ability to remove and add fields, as well as make fields private, public, or show them to only ' +
            'trusted friends.'
    },
    {
        names: [
            "custom-front",
            "custom-fronts",
            "customfront",
            "customfronts",
            "cf",
        ],
        description: 'Explains what "custom front" is.',
        title: "Custom fronts",
        text:
            'Custom fronts is a kind of status for fronts, like "blurred", "unknown member", "dissociated", etc... \n' +
            '\n' +
            'You don\'t want those to show up as real members in your system list but you still want to be able to ' +
            'set front as one of them — that\'s where custom fronts kick in.\n' +
            '\n' +
            'They\'re highly customizable (as per popular request) so you can name them anything you want.'
    },
    {
        names: [
            "front-history-importing",
            'fronthistoryimporting',
            'fronthistory-importing',
            'front-historyimporting',
            'fronthistoryimport',
            'fronthistory-import',
            'front-historyimport',
            'front-history',
            'fronthistory',
            'front-importing',
            'frontimporting',
            'front-import',
            'frontimport',
            'fhi',
        ],
        description: 'Talks about importing the front history from PluralKit.',
        title: "Front history importing",
        text:
            'Importing your front history to and from PluralKit is planned in the future, but is currently ' +
            'impossible to give any front entries to or take entries from PluralKit until APIv2 for PluralKit is ' +
            'finished. This feature also takes a lower priority than features unique to Simply Plural.'
    },
    {
        names: [
            "messaging",
        ],
        description: 'Talks about the possibility of having a messaging feature.',
        title: "Messaging",
        text: 
            'The feature of messaging other systems within the app is out of scope, the app is not meant to be a ' +
            'social community app but a tool for you and your friends. Adding messages between systems would need ' +
            'us to implement moderation tools, moderation team and the actual feature, which is not the direction ' +
            'we are taking the app in right now.\n' +
            '\n' +
            'Messaging within the system, between headmates, is planned for the future so you can communicate more ' +
            'easily within the system.'
    },
    {
        names: [
            "notifications",
            "notification",
        ],
        description: 'Explains how your friends can get notifications from your system.',
        title: "Notifications",
        text:
            'If your friends are not getting notifications, make sure that you go into the settings of the friend ' +
            'by going on their profile and clicking the cog wheel on the right top. Press "They can get ' +
            'notifications". As a second step your friend(s) have to opt-in to get notifications from you, they ' +
            'have to go to your profile in their friends and click "Get notifications if they change front".'
    },
    {
        names: [
            "see-members",
            "seemembers",
            "seembmer",
            "sm",
        ],
        description: 'Explains how to allow your friends to see your members.',
        title: "See members",
        text:
            'If your friends cannot see your members, you have to go into the friend their profile, click on the ' +
            'cogwheel on the right top and press "They can see your shared members", this will allow them to see ' +
            'your public members'
    },
    {
        names: [
            'sync-members-pluralkit',
            'sync-member-pluralkit',
            'syncmemberpluralkit',
            'syncmember-pluralkit',
            'sync-memberpluralkit',
            'syncmemberspluralkit',
            'syncmembers-pluralkit',
            'sync-memberspluralkit',
            'sync-member-plural-kit',
            'syncmemberplural-kit',
            'syncmember-plural-kit',
            'sync-memberplural-kit',
            'syncmembersplural-kit',
            'syncmembers-plural-kit',
            'sync-membersplural-kit',
            'sync-member',
            'syncmember',
            'sync-members',
            'syncmembers',
            'sync-pluralkit',
            'syncpluralkit',
            'sync-plural-kit',
            'syncplural-kit',
            'smp',
            'smpk',
        ],
        description: 'Talks about syncing your members to PluralKit.',
        title: "Sync members to PluralKit",
        text:
            'If you wish to sync your members to PluralKit, go into the settings page -> Integrations -> PluralKit ' +
            'and fill in your PluralKit token, you can get this token by typing pk;token anywhere and PluralKit ' +
            'will message you the token in a DM. \n' +
            '\n' +
            'Once filled out, you can go to actions in the members page and press Sync (rebooting app may be ' +
            'required to see this option after adding the token). You will be prompted with the option to sync to ' +
            'and from pk. \n' +
            '\n' +
            'Pay attention that they are linked by the plural kit id found in the individual member settings in ' +
            'Simply Plural. If you make a member on Simply Plural and you make the same member on PluralKit you ' +
            'will have to go into the individual member settings of Simply Plural and fill in the PluralKit user id ' +
            'in the settings. If you don\'t do this you will end up with duplicate members on Plural Kit.'
    },
    {
        names: [
            "system-relationsips",
            "system-relationship",
            "systemrelationships",
            "sr",
        ],
        description: 'Explains what "system relationships" are.',
        title: "System relationships",
        text:
            'This is an open-ended field meant to describe what relationships a headmate has. It can be used to ' +
            'describe the member\'s relationship to the system as a whole, their inner system relationships such as ' +
            'being family, friends, or romantic partners, or it can describe their outer-system relationships with ' +
            'people in the outer world, such as family, friends, and romantic partners.'
    },
    {
        names: [
            "website",
        ],
        title: "Website",
        description: 'Talks about the possibility of having a web portal for Simply Plural.',
        text: 
            'A web portal for Simply Plural is unlikely to be made at the moment. The framework that Simply Plural ' +
            'has been created with has the capability of web development, but it is currently experimental, which ' +
            'would make it buggy and unstable to use. This decision may change later in the year when the framework ' +
            'becomes more stable and once the app is more complete.'
    }
]