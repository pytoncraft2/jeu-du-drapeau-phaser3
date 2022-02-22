"use strict";
//@ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomState = exports.Input = exports.Player = void 0;
const schema_1 = require("@colyseus/schema");
class Player extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "y", void 0);
exports.Player = Player;
class Input extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.space = false;
    }
}
__decorate([
    (0, schema_1.type)("boolean")
], Input.prototype, "left", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], Input.prototype, "right", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], Input.prototype, "up", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], Input.prototype, "down", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], Input.prototype, "space", void 0);
exports.Input = Input;
class RoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        //@ts-ignore
        this.presences = new schema_1.MapSchema();
        this.playerInputs = new schema_1.MapSchema();
    }
}
__decorate([
    (0, schema_1.type)({ map: Player })
], RoomState.prototype, "presences", void 0);
__decorate([
    (0, schema_1.type)({ map: Input })
], RoomState.prototype, "playerInputs", void 0);
exports.RoomState = RoomState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9vbVN0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9nYW1lL1Jvb21TdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsYUFBYTs7Ozs7Ozs7O0FBRWIsNkNBTXlCO0FBRXpCLE1BQWEsTUFBTyxTQUFRLGVBQU07Q0FHakM7QUFGaUI7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7aUNBQVc7QUFDVjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQztpQ0FBVztBQUY1Qix3QkFHQztBQUVELE1BQWEsS0FBTSxTQUFRLGVBQU07SUFBakM7O1FBQ21CLFNBQUksR0FBWSxLQUFLLENBQUE7UUFDckIsVUFBSyxHQUFZLEtBQUssQ0FBQTtRQUN0QixPQUFFLEdBQVksS0FBSyxDQUFBO1FBQ25CLFNBQUksR0FBWSxLQUFLLENBQUE7UUFDckIsVUFBSyxHQUFZLEtBQUssQ0FBQTtJQUN6QyxDQUFDO0NBQUE7QUFMa0I7SUFBaEIsSUFBQSxhQUFJLEVBQUMsU0FBUyxDQUFDO21DQUFzQjtBQUNyQjtJQUFoQixJQUFBLGFBQUksRUFBQyxTQUFTLENBQUM7b0NBQXVCO0FBQ3RCO0lBQWhCLElBQUEsYUFBSSxFQUFDLFNBQVMsQ0FBQztpQ0FBb0I7QUFDbkI7SUFBaEIsSUFBQSxhQUFJLEVBQUMsU0FBUyxDQUFDO21DQUFzQjtBQUNyQjtJQUFoQixJQUFBLGFBQUksRUFBQyxTQUFTLENBQUM7b0NBQXVCO0FBTHpDLHNCQU1DO0FBRUQsTUFBYSxTQUFVLFNBQVEsZUFBTTtJQUFyQzs7UUFDRSxZQUFZO1FBQ1csY0FBUyxHQUFHLElBQUksa0JBQVMsRUFBVSxDQUFBO1FBQ3BDLGlCQUFZLEdBQUcsSUFBSSxrQkFBUyxFQUFTLENBQUE7SUFDN0QsQ0FBQztDQUFBO0FBRndCO0lBQXRCLElBQUEsYUFBSSxFQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDOzRDQUFvQztBQUNwQztJQUFyQixJQUFBLGFBQUksRUFBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQzsrQ0FBc0M7QUFIN0QsOEJBSUMifQ==